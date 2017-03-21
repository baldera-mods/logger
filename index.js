const {protocol} = require('tera-data-parser');

function hex(n) {
  return (+n).toString(16).toUpperCase();
}

function pad(n, l, c = '0') {
  return String(c).repeat(l).concat(n).slice(-l);
}

module.exports = function Logger(dispatch) {
  const start = Date.now();

  dispatch.hook('*', (code, data, fromServer) => {
    const name = protocol.map.code.get(code);
    const known = !!(name && protocol.messages.get(name));

    const star = (known ? '*' : ' ');
    const arrow = (fromServer ? '<-' : '->');

    const displayTime = pad(Date.now() - start, 9, ' ');
    const displayName = name || pad(hex(code), 4);
    const displayData = data.toString('hex').toUpperCase().replace(/../g, ' $&');

    console.log(`${star} ${displayTime} | ${arrow} ${displayName} |` + displayData);
  });
};
