# Tell Tally Translate

Translates UK bank statements into a legible JSON format.

We parse the [OFX format](http://www.ofx.org/) where possible. Otherwise, we fallback to CSV or scraping PDF formats.

## Output

Produces a JSON format that is compatible with [Tell Tally Calc](https://github.com/ezodude/tt-calc#readme).