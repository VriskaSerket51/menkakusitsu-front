import Banner1 from "../../assets/ebsbanner2023.png";
import Banner2 from "../../assets/water_banner.jpg";
import BannerDetails1 from "../../assets/ebsBanner2023Details.pdf";

type BannerInfo = {
    link: string;
    img: string;
    alt?: string;
};

export const banners: BannerInfo[] = [
    {
        link: BannerDetails1,
        img: Banner1,
        alt: "ebs",
    },
    {
        link: "https://me.go.kr/home/web/board/read.do?menuId=10392&boardMasterId=713&boardId=1584980",
        img: Banner2,
        alt: "worldwatter",
    },
];
