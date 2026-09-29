const fs = require('fs');

fs.writeFile('output.txt', 'This is the second version of the file.', (err) => {
  if (err) throw err;
  console.log('File written successfully.');
});