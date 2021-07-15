function setCopyright() {
  const copyrightSpan = document
    .getElementsByClassName("footer")[0]
    .getElementsByClassName("right")[0]
    .getElementsByClassName("copyright")[0];
  const year = new Date().getFullYear();

  copyrightSpan.innerText = "Copyright © " + year;
}

setCopyright();
