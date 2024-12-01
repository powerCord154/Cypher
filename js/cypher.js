const Cypher = {
  cypher(input) {
    if (!input) {
      return str;
    }
    var output = btoa(input.toString()).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 4) : char).join('');
    return output
  },

  decypher(input) {
    if (!input) {
      return;
    }
    var output;
    if (output = atob(input.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 4) : char).join(''))) {
      return output;
    } else {
      return "err";
    }
  }
}