// @flow
import * as React from 'react';
import Paginator from 'paginator';
import classNames from 'classnames';
import CkoIcon from 'components/ui/icon/';
import { ContainerStyled } from './styled/CkoPagination.sc';

type Props = {
  current: number,
  pageSize: number,
  onChange: Function,
  total: number,
};

export default class CkoPagination extends React.Component<Props> {
  setupPaginator() {
    const paginator = new Paginator(this.props.pageSize, 10);
    return paginator.build(this.props.total, this.props.current);
  }

  handlePaginationClick = (e: any) => {
    const { current } = this.props;
    const pageKey = e.target.getAttribute('data-key');
    let pageIndex = parseInt(pageKey, 10);
    if (isNaN(pageIndex)) {
      pageIndex = pageKey === 'prev' ? current - 1 : current + 1;
    }
    this.props.onChange(pageIndex);
  };

  renderList = () => {
    const pages = [];
    const paginationInfo = this.setupPaginator();
    const { has_previous_page, has_next_page } = paginationInfo;
    const hideNavs = !!(!has_previous_page && !has_next_page);

    const className = {
      prevNav: classNames({
        hide: hideNavs,
        'pagination-prev': true,
        'pagination-disabled': !has_previous_page,
      }),
      nextNav: classNames({
        hide: hideNavs,
        'pagination-next': true,
        'pagination-disabled': !has_next_page,
      }),
    };

    // Add Prev Link
    pages.push(
      <li
        className={className.prevNav}
        key="prvLink"
        data-key="prev"
        onClick={has_previous_page ? this.handlePaginationClick : void 0}>
        <CkoIcon name="left-arrow" /> Previous page
      </li>
    );

    for (
      let i = paginationInfo.first_page;
      i <= paginationInfo.last_page;
      i++
    ) {
      const className = classNames({
        'pagination-item': true,
        'pagination-item-active': i === this.props.current,
      });
      pages.push(
        <li
          key={i}
          className={className}
          data-key={i}
          onClick={this.handlePaginationClick}>
          {i}
        </li>
      );
    }

    // Add Next Link
    pages.push(
      <li
        key="nextLink"
        data-key="next"
        className={className.nextNav}
        onClick={has_next_page ? this.handlePaginationClick : void 0}>
        Next page <CkoIcon name="right-arrow" />
      </li>
    );
    return pages;
  };

  render() {
    return (
      <ContainerStyled>
        <ul>{this.renderList()}</ul>
      </ContainerStyled>
    );
  }
}
