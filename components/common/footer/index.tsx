/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BsTelephoneFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { FiSmartphone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import _env from "../../../config/_env";
import route from "../../../config/route";
import { BlogLink } from "../../../api/repository/blogLinkAPI";

type FooterProps = {
    blogLinks: BlogLink[];
};

const Footer = (props: FooterProps) => {
    const { blogLinks } = props;

    return (
        <footer className="_footer w-full">
            <div className="h-20 bg-gray-200  w-full border-b border-solid border-gray-300 flex items-center">
                <div className="_max-width w-full font-medium flex flex-row text-base">
                    <BsTelephoneFill className="phone-icon mr-3" />
                    Hỗ trợ / Mua hàng:
                    <span className="text-red-500 ml-2">
                        <Link href={`tel:${_env.PHONE_NUMBER}`}>
                            {_env.PHONE_NUMBER}
                        </Link>
                    </span>
                </div>
            </div>
            <div className="_max-width w-full mb-16 mt-5">
                <div className="flex flex-wrap">
                    <div className="pr-5 _content">
                        <h2>Giới thiệu</h2>
                        <p>
                            Chúng mình xuất hiện để đem tới mọi người một chất
                            lượng áo tốt nhất, với giá thành hấp dẫn nhất để đưa
                            Outerity đến với tất cả lứa tuổi và khắp mọi vùng
                            miền đất nước
                        </p>
                    </div>
                    <div className="px-5 flex justify-center _content">
                        <div>
                            <h2>Liên kết</h2>

                            <div className="mb-2">
                                <Link href={route.SEARCH}>Tìm kiếm</Link>
                            </div>
                            {blogLinks.map((blogLink) => (
                                <div key={blogLink._id} className="mb-2">
                                    <Link
                                        href={`${route.PAGE}/${blogLink.slug}`}
                                    >
                                        {blogLink.name}
                                    </Link>
                                </div>
                            ))}

                            {/* <div className="mb-2">
                                <Link href={route.LIE}>Chính sách đổi trả</Link>
                            </div>
                            <div className="mb-2">
                                <Link href={route.SECURITY}>
                                    Chính sách bảo mật
                                </Link>
                            </div>
                            <div className="mb-2">
                                <Link href={route.RULES}>
                                    Điều khoản dịch vụ
                                </Link>
                            </div>
                            <div>
                                <Link href={route.CONTACT}>Liên hệ</Link>
                            </div> */}
                        </div>
                    </div>
                    <div className="contact px-5 flex justify-center _content">
                        <div>
                            <h2>Thông tin liên hệ</h2>
                            <div className="flex mb-2">
                                <MdLocationPin /> Thái nguyên
                            </div>
                            <Link href={`tel:${_env.PHONE_NUMBER}`}>
                                <a>
                                    <div className="flex mb-2">
                                        <FiSmartphone /> {_env.PHONE_NUMBER}
                                    </div>
                                </a>
                            </Link>

                            <div className="flex">
                                <AiOutlineMail /> {_env.EMAIL}
                            </div>
                        </div>
                    </div>
                    <div className="pl-5 _content overflow-hidden">
                        <h2>Fanpage</h2>
                        <iframe src="https://www.facebook.com/v2.0/plugins/page.php?adapt_container_width=true&app_id=&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df840f1ff1a3c08%26domain%3Douteritykids.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fouteritykids.com%252Ff313855d0f052d%26relation%3Dparent.parent&container_width=335&height=300&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Fouteritykids%2F%3Fnotif_id%3D1638862837895794%26notif_t%3Dpage_user_activity%26ref%3Dnotif&locale=en_US&sdk=joey&show_facepile=true&show_posts=false&small_header=false" />
                    </div>
                </div>
            </div>
            <div className="h-16  w-full border-t border-solid border-gray-300 flex items-center justify-center">
                Copyright © 2022 Outeritykids. Powered by Haravan
            </div>
        </footer>
    );
};
export default Footer;
