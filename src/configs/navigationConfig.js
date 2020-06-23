import React from "react"
import * as Icon from "react-feather"
const navigationConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/",
  },
  {
    id: "page2",
    title: "Page 2",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/page2",
  },
  {
    id: "page3",
    title: "Page 3",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/page3",
  },
  {
    id: "admins",
    title: "Admins",
    type: "item",
    icon: <Icon.Users size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/admins",
  }  ,
  {
    id: "newsFeed",
    title: "NewsFeed",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/newsFeed"
  } ,
  {
    id: "playDates",
    title: "PlayDates",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/playDates"
  },
  {
    id: "articles",
    title: "Articles",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/articles"
  },
  {
    id: "reportedUser",
    title: "ReportedUser",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/reportedUser"
  }  ,
  {
    id: "reportedNewsFeed",
    title: "ReportedNewsFeed",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/reportedNewsFeed"
  },  
  {
    id: "users",
    title: "Nuzter",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/users"
  },
  {
    id: "nachrichten",
    title: "Nachrichten",
    type: "item",
    icon: <Icon.List size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/nachrichten"
  }
  ,
  {
    id: "onboarding-fragen",
    title: "Onboarding Fragen",
    type: "item",
    icon: <Icon.HelpCircle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/onboarding-fragen"
  },
  {
    id: "kikudoo-agreement",
    title: "Kikudoo Agreement",
    type: "item",
    icon: <Icon.List size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/kikudoo-agreement"
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/subscriptions"
  },
  {
    id: "dateien",
    title: "Dateien",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/dateien"
  },
  {
    id: "upload",
    title: "Upload",
    type: "item",
    icon: <Icon.List size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/upload"
  },
  {
    id: "chatgruppen",
    title: "Chatgruppen",
    type: "item",
    icon: <Icon.List size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/chatgruppen"
  }

]

export default navigationConfig
