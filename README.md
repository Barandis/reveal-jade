# Reveal.js with Gulp and Jade

The motivation behind this project was to take the excellent [reveal.js][reveal] project and make it work a little but 
better for me, especially since I'm planning on writing many presentations in the near future. These changes are of 
basically two sorts:

* Allow for sensible organization of multiple presentations
* Use [Jade][jade] for authoring presentations

The stock reveal.js includes one `index.html` file that is your presentation, and the server is basically set up to 
read only that `index.html` file. While this isn't too hard to get around, I wanted to create an organized approach 
that makes it easy to select index files both for development and for presentation.

I'm a big fan of [Markdown][markdown] (in fact, I'm writing in it right now!), but it leaves something to be desired in 
reveal.js presentations. 

First, there are some bugs...for instance, if you want to use fragments, you can't use Markdown markup inside the 
fragment or things will get a little screwy. For instance, I tried to put italics inside a list item that was supposed 
to be a fragment, and when it rendered, *only the italic text* was actually turned into a fragment. The rest of that 
list item was always visible, even when the list items above it (which were also fragments) were invisible. I couldn't 
come up with a workaround for this other than to take out the italics entirely.

Secondly, Markdown is somewhat limited in the presentation arena. It's not easy (or perhaps even possible) to have a 
slide that has multiple columns in it, for example. It's also not easy to automate or enhance slides via JavaScript.

HTML is superior in both support and presentation capabilities, but it suffers from one fatal flaw: I don't like to 
write in it. In my work, both professional and personal, I write most of my HTML as Jade templates. It turns out that 
Jade is a perfect fit for writing presentations as well.

### Gulp

The choice to switch from [Grunt][grunt] (in the original reveal.js) to [Gulp][gulp] is one of personal preference. 
Grunt is a fine product that I've used extensively in the past. I slightly favor Gulp, and since I was rewriting the 
build process anyway, I decided to go with what I prefer.

### Jade

Jade is also a personal preference, but one that works out significantly better for this purpose. It's easier to write 
than HTML because you don't have to worry about end tags. But much more importantly, it has inheritance and mixins that 
reduce the amount of boilerplate you have to write significantly.

**NOTE:** Jade is not a requirement to use this package. It also handles HTML files perfectly well.

## Gulp Options and tasks

I've included quite a few Gulp tasks, though only a very few will probably be necessary in normal use. These are 
detailed below. If you're interested in the others, look at the contents of the `gulp/tasks` folder, but mostly those 
are subtasks that are incorporated into the tasks detailed here.

* **gulp build:** This builds a presentation (or all of the presentations). Primarily this is used for building the
  HTML/Jade presentation files, though it will also handle moving assets (images, Markdown files, etc) and building
  CSS/Stylus or JavaScript/LiveScript files as well. It handles the entire presentation.
* **gulp watch:** This tasks sets up a watcher on all of the files in a particular presentation (or all of the
  presentations). When anything changes in that presentation's source, the appropriate build subtask is run.
* **gulp connect:** Fires up a server and makes the presentations available on it. Also reloads the browser when a
  change is made to the presentation.
* **gulp open:** Opens the system's default browser to the index page for a presentation (or to a list of all of the
  presentations available).
* **gulp develop:** Essentially a combination of build, watch, connect, and open. It's intended to give you a realtime
  view of a presentation as you develop it.
* **gulp present:** Opens up a browser to your presentation and nothing more. It doesn't build, watch files, reload,
  etc. This is the one you should use when you actually want to show your presentation.
* **gulp**: Using no task nake is the same as using `gulp present`.

There are three options that you can send to any of these tasks.

* **-b, --base:** Sets the base directory of the presentation source you're using. This defaults to the `topics`
  directory inside the root folder of this project, but by setting this option you can put your presentations anywhere
  and still have them build to the right place.
* **-t, --topic:** Sets the topic that you're working with. This should be the name of the directory where you keep the
  presentation. If no topic is provided, then all topics under the base directory will be used.
* **-p, --port:** Sets the port used by the server to serve up the presentation(s). Defaults to 8000, and you don't
  need to change this unless some other process is using port 8000.

Some quick examples:

* `gulp develop -t git-workflow` will build the presentation located in `./topics/git-workflow`, set a watch on its 
  files to rebuild them if they change, and open up a browser to `http://localhost:8000/topics/git-workflow`.
* `gulp present` (or just `gulp`) will open the browser to `http://localhost:8000/topics`. This will display a list of
  the presentations available and allow one to be selected. Nothing will be built and no changes will be tracked.

## Writing a Presentation

This assumes that you're using Jade. If you're using HTML, you can do it in exactly the same way that you always have,
as long as you recognize that the location of the reveal.js files may be different. They're in the same structure as in
the original project, but the `topics` directory where the presentations are built and served from is on the same level.
That means that you'll probably have to add `../../` to the front of any URL in a `<script>` or `<link>` tag (i.e.,
`js/reveal.js` becomes `../../js/reveal.js`).

There are a couple of pre-built Jade files in the `resources` directory that make life a lot easier by eliminating
boilerplate. Should you choose to use them, you can either reference the layout file where it is, or copy the contents
of the `resources` directory somewhere more convenient and reference it from there. The layout file references any
files in the `include` directory already, so all you have to do is extend the layout file at the top of your Jade file:

```jade
extends ../../resources/layout/presentation
```

The actual path depends on where you put your presentation files and whether you copy the resource files somewhere else.
The above is a reasonable guess since it's what it would be if you use the default `--base` value and leave the resource
files in place.

The layout file takes care of all of the script and CSS calling, along with all of the configuration, so all you have to
do is write the Jade blocks that you need. At a minimum, this would include the `title` block (for the title of the
presentation itself) and the `slides` block (where all of the slides are). There are also blocks for additional scripts,
CSS files, and configuration. See `resources/layout/presentation.jade` for the details.

So a good example `index.jade` file might look like this:

```jade
extends ../../resources/layout/presentation

block title
  title Example Jade/Reveal.js Presentation
  meta(name="description", content="Example presentation using Jade rather than HTML for Reveal.js")
  meta(name="author", content="Thomas Otterson")

block slides
  +slide
    h1 Reveal.js + Jade
    h3 Because writing in HTML is a pain and Markdown doesn't support all the cool Reveal.js features
    p
      small.
        Created by #[a(href="http://hakim.se") Hakim El Hattab] / 
        #[a(href="https://twitter.com/hakimel") @hakimel]
    p
      small.
        #[a(href="http://jade-lang.com") Jade] support by Thomas Otterson
```

The `+slide` mixin doesn't do much except automatially handle Markdown differences. If you want to do a Markdown slide,
use `+slide(data-markdown)`.

More mixins are likely to come in the near future, though these will all be utility mixins to help authoring particular
elements in a slide.

## Known issues

* Live reloading does not yet work.
* Using a `--base` doesn't currently take account of an intermediate folder to put all of the presentations in, so it
  doesn't act like the default.

Both of these (and anything else I find) should be fixed soon.

[reveal]: https://github.com/hakimel/reveal.js
[jade]: http://jade-lang.com/
[markdown]: https://daringfireball.net/projects/markdown/
[grunt]: http://gruntjs.com/
[gulp]: http://gulpjs.com/
