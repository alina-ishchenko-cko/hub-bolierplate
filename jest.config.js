module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/config/jest/setup.js',
  setupFiles: ['<rootDir>/config/jest/config.js'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    'react-inlinesvg': '<rootDir>/config/jest/svgImportMock.js',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileTransformer.js',
  },
};
