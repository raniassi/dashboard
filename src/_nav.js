export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
    },
    {
      name: "User",
      url: "/users",
      icon: "fa fa-user-o",
      children: [
        {
          name: "List User",
          url: "/users/list-user",
          icon: "fa fa-users"
        }
      ]
    },
    {
      name: "Presiden & Parpol",
      url: "/presiden",
      icon: "fa fa-black-tie",
      children: [
        {
          name: "List Presiden",
          url: "/presiden/list-presiden",
          icon: "icon-tie-users"
        },
        {
          name: "List Parpol",
          url: "/presiden/list-parpol",
          icon: "icon-envelope"
        }
      ]
    },
    {
      name: "Hasil",
      url: "/hasil",
      icon: "icon-note",
      children: [
        {
          name: "Hasil Perolehan Suara",
          url: "/hasil/hasil",
          icon: "icon-calculator",
        },
        {
          name: "Hasil Sengketa",
          url: "/hasil/sengketa",
          icon: "icon-calculator",
        },
        
      ]
    }
  ]
};
