import { text, colors, animation } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const TitleStyled = styled('div')`
  font-size: ${toEm(text['15'])};
  color: ${colors.text.primary};
  margin-bottom: ${toRem(20)};
`;

export const NavStyled = styled('div')`
  width: 100%;
  margin-bottom: ${toRem(38)};

  span {
    cursor: pointer;
  }

  & .slide-link {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #e8e9ea;
    border: solid 2px #fff;
    display: inline-block;
    margin: 0 2.5px;
    line-height: 7px;
    vertical-align: middle;
    box-sizing: content-box;
    ${animation.ease};

    &.active {
      background-color: ${colors.link};
      border-color: ${colors.link};
    }
  }

  .slideWrap {
    display: inline-block;
    margin: 0 20px;
    vertical-align: middle;
  }
`;

export const SlideStyled = styled('div')`
  text-align: center;
  color: ${colors.text.tertiary};
  font-size: 1em;

  div {
    display: block;
  }

  .cko-icon {
    margin: 30px 10px 0 10px;
  }
`;

export const CarouselStyled = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: ${toRem(64)};

  .inner-carousel {
    width: 70%;
    margin: 0 auto;
  }

  .ant-carousel {
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .ant-carousel .slick-slider {
    position: relative;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-touch-callout: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }

  .ant-carousel .slick-list {
    position: relative;
    overflow: hidden;
    display: block;
    margin: 0;
    padding: 0;
  }
  .ant-carousel .slick-list:focus {
    outline: none;
  }
  .ant-carousel .slick-list.dragging {
    cursor: pointer;
  }
  .ant-carousel .slick-slider .slick-track,
  .ant-carousel .slick-slider .slick-list {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .ant-carousel .slick-track {
    position: relative;
    left: 0;
    top: 0;
    display: block;
  }
  .ant-carousel .slick-track:before,
  .ant-carousel .slick-track:after {
    content: '';
    display: table;
  }
  .ant-carousel .slick-track:after {
    clear: both;
  }
  .slick-loading .ant-carousel .slick-track {
    visibility: hidden;
  }
  .ant-carousel .slick-slide {
    float: left;
    height: 100%;
    min-height: 1px;
    display: none;
  }
  [dir='rtl'] .ant-carousel .slick-slide {
    float: right;
  }
  .ant-carousel .slick-slide img {
    display: block;
  }
  .ant-carousel .slick-slide.slick-loading img {
    display: none;
  }
  .ant-carousel .slick-slide.dragging img {
    pointer-events: none;
  }
  .ant-carousel .slick-initialized .slick-slide {
    display: block;
  }
  .ant-carousel .slick-loading .slick-slide {
    visibility: hidden;
  }
  .ant-carousel .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }
  .ant-carousel .slick-arrow.slick-hidden {
    display: none;
  }
  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    position: absolute;
    display: block;
    height: 20px;
    width: 20px;
    line-height: 0;
    font-size: 0;
    cursor: pointer;
    background: transparent;
    color: transparent;
    top: 50%;
    margin-top: -10px;
    padding: 0;
    border: 0;
    outline: none;
  }
  .ant-carousel .slick-prev:hover,
  .ant-carousel .slick-next:hover,
  .ant-carousel .slick-prev:focus,
  .ant-carousel .slick-next:focus {
    outline: none;
    background: transparent;
    color: transparent;
  }
  .ant-carousel .slick-prev:hover:before,
  .ant-carousel .slick-next:hover:before,
  .ant-carousel .slick-prev:focus:before,
  .ant-carousel .slick-next:focus:before {
    opacity: 1;
  }
  .ant-carousel .slick-prev.slick-disabled:before,
  .ant-carousel .slick-next.slick-disabled:before {
    opacity: 0.25;
  }
  .ant-carousel .slick-prev {
    left: -25px;
  }
  .ant-carousel .slick-prev:before {
    content: '<';
  }
  .ant-carousel .slick-next {
    right: -25px;
  }

  .ant-carousel .slick-next:before {
    content: '>';
  }

  .ant-carousel .slick-dots {
    position: absolute;
    bottom: 12px;
    list-style: none;
    display: block;
    text-align: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 3px;
  }
  .ant-carousel .slick-dots li {
    position: relative;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin: 0 2px;
    padding: 0;
  }
  .ant-carousel .slick-dots li button {
    border: 0;
    cursor: pointer;
    background: #fff;
    opacity: 0.3;
    display: block;
    width: 16px;
    height: 3px;
    border-radius: 1px;
    outline: none;
    font-size: 0;
    color: transparent;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    padding: 0;
  }
  .ant-carousel .slick-dots li button:hover,
  .ant-carousel .slick-dots li button:focus {
    opacity: 0.75;
  }
  .ant-carousel .slick-dots li.slick-active button {
    background: #fff;
    opacity: 1;
    width: 24px;
  }
  .ant-carousel .slick-dots li.slick-active button:hover,
  .ant-carousel .slick-dots li.slick-active button:focus {
    opacity: 1;
  }
  .ant-carousel-vertical .slick-dots {
    width: 3px;
    bottom: auto;
    right: 12px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    height: auto;
  }
  .ant-carousel-vertical .slick-dots li {
    margin: 0 2px;
    vertical-align: baseline;
  }
  .ant-carousel-vertical .slick-dots li button {
    width: 3px;
    height: 16px;
  }
  .ant-carousel-vertical .slick-dots li.slick-active button {
    width: 3px;
    height: 24px;
  }
`;
