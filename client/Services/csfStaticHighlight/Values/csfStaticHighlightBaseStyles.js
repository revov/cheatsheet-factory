angular.module('cheatsheet')
    .value(
    'csfStaticHighlightBaseStyles',
    ".ace_static_highlight {\
font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', 'Droid Sans Mono', monospace;\
font-size: 12px;\
}\
.ace_static_highlight .ace_gutter {\
width: 25px !important;\
float: left;\
text-align: right;\
padding: 0 3px 0 0;\
margin-right: 3px;\
position: static !important;\
}\
.ace_static_highlight .ace_line { clear: both; }\
.ace_static_highlight .ace_gutter-cell {\
-moz-user-select: -moz-none;\
-khtml-user-select: none;\
-webkit-user-select: none;\
user-select: none;\
}\
.ace_static_highlight .ace_gutter-cell:before {\
content: counter(ace_line, decimal);\
counter-increment: ace_line;\
}\
.ace_static_highlight {\
counter-reset: ace_line;\
}\
");