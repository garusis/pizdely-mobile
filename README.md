# gulp-multienv-approach
A gulp setup that can be used in multi env projects

If you are in linux and get 
```
    Error: watch ENOSPC
        at errnoException (fs.js:1019:11)
        at FSWatcher.start (fs.js:1051:11)
```
Please try with `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`