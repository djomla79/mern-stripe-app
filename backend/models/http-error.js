class HttpError extends Error {
  constructor(message, codeError) {
    super(message);
    this.code = codeError;
  }
}

module.exports = HttpError;
