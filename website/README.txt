// This is to get you started with SASS, the "make css easier" scripting language.
// They built this thing in Ruby. Hooray more crap to install.

// Before you start, you have to do some things.
// 1. Install Ruby for Windows. That lives here: https://rubyinstaller.org/downloads/
// 2. Click your way through that one, then try the following command
//        gem install sass
// 3. If you hit a certificate error (like I did) then you need to do the following: 
//    a. Go to http://rubygems.org/pages/download
//    b. Grab the latest zip file. 
//    c. Unzip, and open a command prompt (should say command prompt with Ruby) at the unzip location
//    d. Run "ruby setup.rb" in the command prompt
//    e. Time passes, then all is right in the world.
//    f. Try step 2 again.
// 4. Run the following:
//        sass -v
// 5. If that looks legit (says "Bleeding Edge"), then you're good to turn on the magic. All you gotta do 
//    is run: 
//        sass --watch website\stylesheets
// 
//    where website\stylesheets is the folder structure from your pwd.
//    .gitignore is set to get rid of the .map files (sass stuff) and I'm on the fence about even including the *.css files. 
//    For now, I'm checking them in.
// 6. The way this generally works is: 
//    - Turn on the Live Preview in VS Code
//    - Watch the website directory with SASS
//    - Make changes to the *.scss files. 
//    - Everything updates automatically when you update something and save.

// Getting started guide: http://sass-lang.com/guide
// Handy-dandy SASS reference: http://sass-lang.com/documentation/file.SASS_REFERENCE.html
// More SASS tutorials: https://scotch.io/tutorials/getting-started-with-sass