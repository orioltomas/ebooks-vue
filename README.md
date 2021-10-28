# ebooks-vue

## Project setup
```
npm install
```
Add ebook files on '/public/ebooks' folder.
Define all ebook info on '/src/data/ebooks.json', like so:
```
[
  {
    "title": "The name of the wind",
    "description": "Told in Kvothe's own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen. The intimate narrative of his childhood in a troupe of traveling players, his years spent as a near-feral orphan in a crime-ridden city, his daringly brazen yet successful bid to enter a legendary school of magic, and his life as a fugitive after the murder of a king form a gripping coming-of-age story unrivaled in recent literature.",
    "author": "Patrick Rothfuss",
    "publication": "2007",
    "creation": "2021-10-26T00:00:00Z",
    "categories": ["fantasy"],
    "files": {
      "ca": null,
      "es": null,
      "en": "The name of the wind.mobi"
    }
  }
]
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
