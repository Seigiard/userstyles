# Userstyles

Set of styles for Userstyles Manager as [Stylus](https://github.com/openstyles/stylus) and others.

## How to use

Install userstyle extension and open a file using `raw` button.

## Development

Run `bun install` to install the tools and Lefthook's pre-commit hook. It formats
staged CSS, userscripts, and project metadata with Prettier and re-stages fixes.
UserStyle and UserScript metadata comments stay in the files.

Run `bun run lint` to parse-check all styles and userscripts without rewriting
them, or `bun run format` to format them explicitly.
