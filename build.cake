//////////////////////////////////////////////////////////////////////
// TOOLS
//////////////////////////////////////////////////////////////////////
#tool "nuget:?package=OctopusTools"

//////////////////////////////////////////////////////////////////////
// ADDINS
//////////////////////////////////////////////////////////////////////
#addin "Cake.Npm"
#addin "Cake.Gulp"
#addin nuget:?package=Cake.Json
#addin nuget:?package=Newtonsoft.Json&version=9.0.1

//////////////////////////////////////////////////////////////////////
// CLASSES
//////////////////////////////////////////////////////////////////////
public class Package
{
    public string Name { get; set; }
    public string Version { get; set; }
}

//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////
var target = Argument("target", "Default");

///////////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
///////////////////////////////////////////////////////////////////////////////
var isCIBuild			= !BuildSystem.IsLocalBuild;
var buildArtifacts      = Directory("./artifacts");
var package 			= DeserializeJsonFromFile<Package>("package.json");

///////////////////////////////////////////////////////////////////////////////
// SETUP / TEARDOWN
///////////////////////////////////////////////////////////////////////////////
Setup(context =>
{
	Information("Building The Hub v{0}", package.Version);
});

Teardown(context =>
{
	Information("Finished running tasks.");
});

//////////////////////////////////////////////////////////////////////
//  PRIVATE TASKS
//////////////////////////////////////////////////////////////////////

Task("__Clean")
	.Does(() =>
	{
		CleanDirectories(new DirectoryPath[] { buildArtifacts });
	});

Task("__Build")
	.Does(() =>
	{
		NpmInstall();
		NpmRunScript("build");
	});

Task("__Pack")
	.Does(() =>
	{
		CreateDirectory("artifacts");

		var settings = 
			new NuGetPackSettings 
			{
				Id                      = "TheHub2",
				Version                 = package.Version,
				Title                   = "The Hub 2",
				Authors                 = new[] {"Tosin Ekolie"},
				Description             = "The Checkout Hub 2",
				Summary                 = "The Checkout Hub 2",
				ProjectUrl              = new Uri("https://github.com/CKOTech/checkout-hub-v2"),
				Files                   = new [] {new NuSpecContent {Source = "**", Target = "build"}},
				BasePath                = "./build",
				OutputDirectory         = "./artifacts"
			};

		NuGetPack(settings);
	});

// Task("__Test")
// 	.Does(() =>
// 	{
// 		NpmRunScript("test");
// 	});

Task("__OctoPush")
	.Does(() =>
	{
		var packages = GetFiles("./artifacts/*.nupkg");

		OctoPush(
			EnvironmentVariable("Octopus_Server"),
			EnvironmentVariable("Octopus_ApiKey"),
			packages,
			new OctopusPushSettings {
				ReplaceExisting = true
			}
		);
	});


//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////
Task("Package")
	.IsDependentOn("__Clean")
	.IsDependentOn("__Build")
	.IsDependentOn("__Pack");

Task("Deploy")
	.IsDependentOn("Package")
	.IsDependentOn("__OctoPush");

Task("Default")
	.IsDependentOn("Package");

//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////
RunTarget(target);