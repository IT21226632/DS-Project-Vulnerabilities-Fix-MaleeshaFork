import { FaLink } from "react-icons/fa6";

const instructorSidebarData = [
  {
    text: "New Course",
    icon: <FaLink />,
    link: "/instructor/dashboard/create-course",
  },
  {
    text: "Courses",
    icon: <FaLink />,
    link: "/instructor/dashboard/courses",
  },
  {
    text: "settings",
    icon: <FaLink />,
    link: "/instructor/link",
  },
  {
    text: "Students",
    icon: <FaLink />,
    link: "/instructor/link",
  },
  {
    text: "Notifications",
    icon: <FaLink />,
    link: "/instructor/link",
  },
  {
		text: "Contact Admin",
		icon: <FaLink />,
		link: "/instructor/dashboard/contact-admin",
	},
];

export default instructorSidebarData;
