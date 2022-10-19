# Tassel

Tassel is a template project for adding bookmarks to a browser in an updatable,
invisible way. It's called "Tassel" because it's designed to be unobtrusive and
attached to a browser to provide bookmarks, sort of like those ribbons you
sometimes find in old encyclopedias and stuff.

## Usage

This tool will be useful to you if you want to automate bookmark distribution.
To use it:

1. Start by forking this project.
2. Open the `config.sh` file in your choice of text editor and change the values
 to reflect those used by your project or organization. These will be added to
 the manifest.json and are important for your organizational needs.
3. Open the `bookmarks.json` and change the `Directory` field to the directory
 name where you want to place bookmarks.
4. In the `bookmarks.json` file, add the bookmarks you want to the `bookmarks[]`
 array. You can add any valid `bookmarks.createDetails` object.
5. Run `make.sh` to generate a `${TASSEL_NAME}.zip` file which is ready for submission
 to `addons.mozilla.org`