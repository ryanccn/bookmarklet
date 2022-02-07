interface Config {
  /**
   * Whether or not to write to file; if write to file, the filename
   *
   * **NOTE:** the file *will* include the `javascript:` prefix, so better save it as a `.txt` file
   */
  write: false | string;

  /** Whether or not to print the bookmarklet to console */
  print: boolean;

  /** Whether or not to automatically copy to clipboard */
  copy: boolean;
}

export default <Config>{
  write: 'bookmarklet.txt',
  print: false,
  copy: true,
};
