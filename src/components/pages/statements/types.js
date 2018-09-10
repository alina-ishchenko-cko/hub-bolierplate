export type ColumnDimenionView = {
  collapsed: number,
  uncollapsed: number,
};

export type ColumnDimension = {
  large: ColumnDimenionView,
  laptop: ColumnDimenionView,
  largeLaptop: ColumnDimenionView,
};

export type ColumnDimensionMap = { [key: string]: ColumnDimension };
