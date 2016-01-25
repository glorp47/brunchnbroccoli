# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# users
User.create([
  {username: "haris.a.qureshi@gmail.com",
   password: "password",
   user_profile_attributes: {
     fname: "Guest",
     lname: "Guest",
     phone: "512-413-6298",
     }},
  {username: "johnconnor@skynet.com",
   password: "terminator",
   user_profile_attributes: {
     fname: "John",
     lname: "Connor",
     phone: "222-513-2169",
     profile_pic_url: "/v1453701772/johnconnor_sf6hio.jpg"
     }},
  {username: "abrahamlincoln@union.gov",
   password: "civilwar",
   user_profile_attributes: {
     fname: "Abraham",
     lname: "Lincoln",
     phone: "237-986-2645",
     profile_pic_url: "/v1453704636/abe_lincoln_vhlwt9.jpg"
     }},
  {username: "kylo@theforce.net",
   password: "rensgreat",
   user_profile_attributes: {
     fname: "Kylo",
     lname: "Ren",
     phone: "467-521-8426",
     profile_pic_url: "/v1453704894/KyloRen-2015_ttebzv.jpg"
     }},
  {username: "kermit@the.frog",
   password: "piggy2007",
   user_profile_attributes: {
     fname: "Kermit",
     lname: "Frog",
     phone: "211-152-0165",
     profile_pic_url: "/v1453704982/kermit_izzrn9.jpg"
     }}

  ])

Room.create([
  # airbnb:51557
  {
    host_id: "2",
    title: "Miniscule Dorm Room",
    type_id: "1",
    price: "70",
    city: "San Francisco",
    lat: "37.759532",
    lng: "-122.428713",
    primary_pic_id: "1",
    max_guest_num: "2",
    bed_num: "1",
    description: "Comes complete with two-bar wi-fi signal of nearby coffeeshop as well as conveniently placed nearby trashcan."
  },
  # airbnb:3667334
  {
    host_id: "3",
    title: "Startup House",
    type_id: "1",
    price: "195",
    city: "San Francisco",
    lat: "37.773859",
    lng: "-122.412614",
    primary_pic_id: "1",
    max_guest_num: "2",
    bed_num: "1",
    description: "Filled with all sorts of scuttlebutt about IPOs, seed funding, frameworks and artisanal quinoa."
  },
  # airbnb:8390615
  {
    host_id: "3",
    title: "Roach Motel",
    type_id: "2",
    price: "125",
    city: "San Francisco",
    lat: "37.787199",
    lng: "-122.418843",
    primary_pic_id: "1",
    max_guest_num: "2",
    bed_num: "1",
    description: "Indeed, this place is so small that you can actually hear the impending sense of doom coming."
  },
  # airbnb:6993593
  {
    host_id: "4",
    title: "Half-Empty SRO",
    type_id: "2",
    price: "140",
    city: "San Francisco",
    lat: "37.803448",
    lng: "-122.420559",
    primary_pic_id: "1",
    max_guest_num: "2",
    bed_num: "1",
    description: "Has an amazing view of gentrification."
  },
  # airbnb:6993593
  {
    host_id: "5",
    title: "Golden Condo",
    type_id: "2",
    price: "350",
    city: "San Francisco",
    lat: "37.773365",
    lng: "-122.441008",
    primary_pic_id: "1",
    max_guest_num: "2",
    bed_num: "1",
    description: "Ed Lee will knock on your door and personally give you his GrubHub account."
  }
  ])
    #51557
  RoomPic.create!([
    {
      room_id: "1",
      pic_url: "/v1453705689/3room_x0lwte.jpg"
    },
    {
      room_id: "1",
      pic_url: "/v1453705818/petite_post_room_03_xxvx1b.jpg"
    }
  ])
    #3667334
  RoomPic.create!([
    {
      room_id: "2",
      pic_url: "/v1453709575/nonoam_eygex5.jpg"
    },
    {
      room_id: "2",
      pic_url: "/v1453709750/mirror-in-your-living-room-01_g8lz6a.jpg"
    },
    {
      room_id: "2",
      pic_url: "/v1453709805/Utilize-natural-light-living-room-02_zoxkxn.jpg"
    }
    ])
    #8390615
  RoomPic.create!([
    {
      room_id: "3",
      pic_url: "/v1453710085/teen-bedroom.jpg"
    },
    {
      room_id: "3",
      pic_url: "/v1453710295/dorm_p0yo2g.jpg"
    }
    ])
    # 6993593
  RoomPic.create!([
    {
      room_id: "4",
      pic_url: "/v1453710402/randomroom_hofhrv.jpg"
    },
    {
      room_id: "4",
      pic_url: "/v1453710469/craftroom_mjafw4.jpg"
    }
    ])
    # 187875
  RoomPic.create!([
    {
      room_id: "5",
      pic_url: "/v1453710625/studio_pwtim3.jpg"
    },
    {
      room_id: "5",
      pic_url: "/v1453710676/stu2_etoq55.jpg"
    }
    ])


Reservation.create!([
  {
    room_id: "4",
    requester_id: "1",
    guest_num: "1",
    start_date: "2015-12-01",
    end_date: "2015-12-05",
    status: "1"
  },
  {
    room_id: "4",
    requester_id: "1",
    guest_num: "2",
    start_date: "2016-01-01",
    end_date: "2016-01-30",
    status: "1"
  },
  {
    room_id: "1",
    requester_id: "1",
    guest_num: "1",
    start_date: "2016-05-10",
    end_date: "2016-05-15",
    status: "1"
  },
  {
    room_id: "3",
    requester_id: "1",
    guest_num: "1",
    start_date: "2016-02-01",
    end_date: "2016-02-03",
    status: "0"
  }
  ])
