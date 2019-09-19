@FEBoxShadow:rgba(96, 96, 96, 0.1357142857142857);
@FEBorder:#d9d9d9;
@FEWhite:#FFF;
@FERedBg:#C8102E;
@FERedTxt:#E85661;
/* color start */
@title-bg: #fafafa;
@main-red: #d91e2c;
@button-red: #d91e2c;
@font-gray: #707070;
@font-main-color: #313131;
@font-error-color: #919191;
@bg-gray: #f0f2f5;
@bg-import_gray: #f2f3f5;
@border_gray: #bfbfbf;
@right-green: #7aca13;
@font-tip-gray: #434343;
@font-menu-gray: #898989;
@bg-write: #fff;
@input-font-color: #959595;
@title-font-color: #313131;
@flag-yellow: #fff79a;
@flag-red: #f29c9f;
@table-bg: #f8e1e1;
/* color end */

@button-red:#C8112D;
@button-white: #fff;
@button-grey: #A0A0A0;
@button-green:#80C26A;
@button-pink:#EB6876;
@button-orange:#fe9523;
@button-blue:#1890ff;

/* font start */

@font-small: 12px;
@font-medium: 14px;
@font-large: 16px;
@font-18: 18px;
@font-20: 20px;

/* font end */

@wrapper-margin: 30px;

/* border start */

.border-top(@size: 1px,@color: #333){
  border-top: @size solid @color;
}
.border-bottom(@size: 1px,@color: #333){
  border-bottom: @size solid @color;
}
.border-left(@size: 1px,@color: #333){
  border-left: @size solid @color;
}
.border-right(@size: 1px,@color: #333){
  border-right: @size solid @color;
}
.border(@size: 1px,@color: #333){
  border: @size solid @color;
}

/* border end */

/* border start */

.border-radius (@radius: 5px) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}

/* border end */

.name(){
  font-size: 16px;
  font-family:  'SimHei', sans-serif;
}

.clearFix(){
  &:after{
    content:"";
    display:block;
    clear:both;
  }
  zoom:1
}

.flex(){
  display:-webkit-box;
  display:-webkit-flex;
  display:-ms-flexbox;
  display:flex;
}

.flex-1(){
  -webkit-box-flex:1;
  -webkit-flex:1;
  -ms-flex:1;
  flex:1;
}

/* direction */
.flex-direction-column(@direction:column){
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
/* direction */
.flex-direction-reverse(@direction:row-reverse){
  -webkit-box-orient: horizontal;
  -webkit-flex-direction: row-reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
}

/* Horizontal center */
.flex-pack-center(){
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

/* Vertical center */
.flex-align-center() {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

/* full-justified */
.flex-pack-justify(){
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
