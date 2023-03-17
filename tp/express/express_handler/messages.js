function messages(req, res) {
    res.send('<h1>Messages</h1><ul><li>Hello 1</li><li>Hello 2</li></ul>');
    res.send(planets);
}

module.exports = {
    messages
};