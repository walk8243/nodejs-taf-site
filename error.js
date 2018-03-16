function printErrorMessage(mode, contents=[]){
  var message;
  switch (mode) {
    case 0:
      message = `'${contents[0]}' isn't exist!`;
      break;
    case 1:
      message = `
Server'${contents[0]}' is Already exist!
Please choose a different name!
      `;
      break;
    case 2:
      message = `
Hostname'${contents[0]}' is not appropriate!
3 to 10 alphanumeric characters only.
Please enter a different name!
      `;
      break;
    case 3:
      message = `
Route file'${contents[0]}' is Already exist!
Please change the name of '${contents[0]}' or enter a different name!
      `;
      break;
    case 4:
      message = `
Server'${contents[0]}' doesn't exist!
      `;
      break;
    case 5:
      message = `
'${contents[0]}' isn't Directory!
      `;
      break;
    case 100:
      message = `
Server'${contents[0]}' can't start!
Please check the configuration file!
      `;
      break;
    case 101:
      message = `
Server can't start!
Please check error message!
      `;
      break;
    case 200:
      message = `
Command Error!
Please execute command'man' and check the command syntax!
      `;
      break;
    default: break;
  }

  return message.replace(/^\n/, '');
}

module.exports.printErrorMessage = printErrorMessage;
