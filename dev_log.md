12/14/2015
npm init --yes
npm install --save webpack react react-dom flux babel-core babel-loader babel-preset-react
npm install --save bootstrap
npm install --save history
npm uninstall history
npm install --save history@1.13.x
npm install --save react-addons-linked-state-mixin@0.14.2
npm install --save react-router@1.0.2
bundle install

rails g model user
rake db:create
rake db:migrate
rails g controller Api::Users
rails g controller StaticPages
rails g controller Api::session
rails destroy controller Api::session
rails g controller Api::sessions

12/15/2015
rails g model user_profile
rake db:migrate
rails g model room
rake db:migrate
bundle exec annotate
rails g controller Rooms
rails destroy controller Rooms
rails g controller Api::Rooms
rake db:reset
npm install --save react-bootstrap


12/16/2015
ToDo: refactor google maps loading

bundle install

12/17/2015
#remove turbolinks
bundle install
rails g migration AddColumnsToRooms
rake db:migrate

12/18/2015
rails g model reservation
rake db:migrate
# add jquery-ui
bundle install

12/20/2015
https://jqueryui.com/resources/demos/slider/range.html
rails g controller Api::Reservations

12/22/2015
https://www.facilities.umd.edu/Style%20Library/FM%20Publishing/JQuery/daterangepicker/website/index.html#license
styledMarker
use canvas drawing for google markers
