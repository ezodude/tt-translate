# Tell Tally Translate

Translates UK bank statements into charges for Tell Tally Calc.

We parse the [OFX format](http://www.ofx.org/) where possible. Otherwise, we fallback to CSV or scraping PDF formats.

## Output

Produces charges in a JSON format that is compatible with [Tell Tally Calc](https://github.com/ezodude/tt-calc#readme).