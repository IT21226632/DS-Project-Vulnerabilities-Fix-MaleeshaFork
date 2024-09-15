import { FaLink } from "react-icons/fa6";
import { MdContentPasteGo } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";

const adminSidebarData = [
	{
		text: "Create Admin",
		icon: <GrUserManager />,
		link: "/admin/dashboard/create-admin/",
	},
	{
		text: "Course Mgmt.",
		icon: <MdContentPasteGo />,
		link: "/admin/dashboard/course-management/",
	},
	{
		text: "Inquiries",
		icon: <FaLink />,
		link: "/admin/dashboard/inquiries/",
	},
	{
		text: "Notifications",
		icon: <FaLink />,
		link: "/admin/dashboard/notification/",
	},

];

export default adminSidebarData;
