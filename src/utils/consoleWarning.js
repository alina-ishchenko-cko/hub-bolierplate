export default function consoleWarning() {
  let warningTitle = 'Stop!';
  let warningMsg =
    'Using this console may allow attackers to impersonate you and steal your information';
  warningMsg +=
    'using an attack called Self-XSS. \nDo not enter or paste code that you do not understand.';

  // Style
  const style = {
    title:
      'color: red; font-size: 50px; font-weight: bold; -webkit-text-stroke: 1px black; text-stroke: 1px black;',
    body: 'color: black; font-size: 18px;'
  };

  // Output warning
  console.log(`%c${warningTitle}`, style.title);
  console.log(`%c${warningMsg}`, style.body);
}
