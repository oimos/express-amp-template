# AMP Template in Express

##  Getting Started

With this repo, you can try to test how **AMP** works. Since it needs some server side knowledge to test api for amp-list, amp-form .etc, I thought it would be useful if there's a simple package-like repo for those who are not so familiar with backend.
**There are many cases that front end developers need to create AMP template with testing amp-component but it is sometimes hard to test api part with their own.**
I just implemented very basic amp-form in this repo but feel free to do pull request so that we can make it better.


<pre>
.
├── app.js
├── routes
│   └── post.js
└── views
    ├── base_style.css
    ├── footer.ejs
    ├── footerAmp.ejs
    ├── header.ejs
    ├── headerAmp.ejs
    └── posts
</pre>


### Installing

To make your life easier, install [nodemon](https://github.com/remy/nodemon)
```
npm install -g nodemon
```
After this
```
npm i
```
And then run

```
nodemon app
```
with `localhost:3000` it shows the page.

## License

This project is licensed under the MIT License