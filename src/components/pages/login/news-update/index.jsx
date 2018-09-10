// @flow
import * as React from 'react';
import Carousel from 'antd/lib/carousel';
import CkoIcon from 'components/ui/icon/';
import classNames from 'classnames';
import {
  CarouselStyled,
  TitleStyled,
  SlideStyled,
  NavStyled,
} from './NewsUpdate.sc';

type Props = {};

type State = {
  currentSlide: number,
  totalSlides: number,
};
export default class NewsUpdate extends React.Component<Props, State> {
  state = {
    currentSlide: 0,
    totalSlides: 2,
  };

  slider: any;

  nextSlide = () => {
    this.slider.next();
  };

  prevSlide = () => {
    this.slider.prev();
  };

  goToSlide = (e: SyntheticEvent<HTMLDivElement>) => {
    let slideNum = e.currentTarget.getAttribute('data-num');
    this.slider.goTo(slideNum);
  };

  beforeChange = (from: number, to: number) => {
    this.setState({ currentSlide: to });
  };

  getSlideLinks(): Array<React.Element<'span'>> {
    const slides: Array<React.Element<'span'>> = [];
    for (let i = 0; i < this.state.totalSlides; i++) {
      let className = classNames({
        'slide-link': true,
        active: !!(this.state.currentSlide === i),
      });
      slides.push(
        <span
          key={i}
          className={className}
          data-num={i}
          onClick={this.goToSlide}
        />
      );
    }
    return slides;
  }

  render() {
    const carouselProps = {
      autoplay: true,
      dots: false,
      effect: 'scrollx',
      beforeChange: this.beforeChange,
    };

    return (
      <CarouselStyled>
        <TitleStyled>Did you know?</TitleStyled>
        <NavStyled>
          <CkoIcon name="left-arrow" onClick={this.prevSlide} />
          <span className="slideWrap">{this.getSlideLinks()}</span>
          <CkoIcon name="right-arrow" onClick={this.nextSlide} />
        </NavStyled>
        <div className="inner-carousel">
          <Carousel {...carouselProps} ref={c => (this.slider = c)}>
            <SlideStyled>
              From 29 October 2017 Checkout.com accepts new alternative payment
              methods implementations like:
              <div>
                <CkoIcon name="apple-pay-full" />
                <CkoIcon name="paypal-full" />
              </div>
            </SlideStyled>

            <SlideStyled>
              From !!!! October 2020 Checkout.com accepts new alternative
              payment methods implementations like:
            </SlideStyled>
          </Carousel>
        </div>
      </CarouselStyled>
    );
  }
}
