<%@ page language="java" contentType="text/html; charset=UTF-8"
isELIgnored="false" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>QC Tool</title>

    <link href="resources/css/bootstrap.min.css" rel="stylesheet" />
    <link href="resources/font-awesome/css/font-awesome.css" rel="stylesheet" />

    <link href="resources/css/plugins/slick/slick.css" rel="stylesheet" />
    <link href="resources/css/plugins/slick/slick-theme.css" rel="stylesheet" />

    <link href="resources/css/animate.css" rel="stylesheet" />
    <link href="resources/css/style.css" rel="stylesheet" />
    <link rel="stylesheet" href="resources/css/userdefined/design.css"/>
    <link rel="icon" href="resources/img/p6.jpg"/>
    
  </head>

  <body class="top-navigation">
  
    <div id="page-wrapper" class="gray-bg">
<!-- <p style="color:blue;">sdd</p> -->
        <div class="row border-bottom " >
          <nav class="navbar navbar-static-top" role="navigation" style="background-color:black;">
            <div class="navbar-header">
              <button
                aria-controls="navbar"
                aria-expanded="false"
                data-target="#navbar"
                data-toggle="collapse"
                class="navbar-toggle collapsed"
                type="button"
              >
                <i class="fa fa-reorder"></i>
              </button>
              <a href="#" class="navbar-brand">QC Tool</a>
            </div>
            <div class="navbar-collapse collapse" id="navbar" >
              <ul class="nav navbar-nav">
                <li>
                  <a id="functionality" aria-expanded="false" role="button" href="javascript:zoom(true,1000);" >
                 Zoom In &nbsp;<i class="fa fa-search-plus" aria-hidden="true"></i></a
                  >
                </li>
                <li>
                  <a id="functionality" aria-expanded="false" role="button" href="javascript:zoom(false,1000);" >
                    Zoom Out &nbsp;<i class="fa fa-search-minus" aria-hidden="true"></i></a
                  >
                </li>
                <li>
                  <a id="functionality" aria-expanded="false" role="button" href="javascript:undo();" >
                   Undo <i class="fa fa-undo" aria-hidden="true"></i></a
                  >
                </li>
                <li>
                  <a id="functionality" aria-expanded="false" role="button" href="javascript:clear_canvas();" >
                   Clear <i class="fa fa-refresh" aria-hidden="true"></i></a
                  >
                </li>
                <li>
                  <a id="functionality" aria-expanded="false" role="button" href="javascript:savecoords();" >
                   Download JSON <i class="fa fa-download" aria-hidden="true"></i></a
                  >
                </li>
                <li>
                  <div class="file-upload">
					  <div class="file-select">
					    <div class="file-select-button" id="fileName">Upload JSON</div>
					    <input type="file" name="chooseFile" id="chooseFile">
					  </div>
				 </div>  
                </li>
                <li>
                  <div class="file-upload">
						  <div class="file-select">
						    <div class="file-select-button" id="fileName">Choose Image</div>
						    <div class="file-select-name" id="noFile">No file chosen...</div> 
						    <input type="file" name="imageLoader" id="imageLoader">
						    
						  </div>
						</div>  
                </li>
                <li>
                <div class="instructions">
					<button  class="inst" type="button" class="btn btn-md" data-toggle="modal" data-target="#myModal">
					  Info &nbsp;<i class="fa fa-info-circle" aria-hidden="true"></i>
					</button>
					</div>
                </li>                                                    
              </ul>
            </div>
          </nav>
        </div>
      
      <div class="animated fadeInRight  ">
        <div class="row">
        
          <div class="col-lg-12" style="margin:0px;padding:0px;">
            <div class="ibox product-detail">
              <div class="ibox-content gray-bg">   
                <div class="row">
                  <div class="col-md-12 col-sm-6 col-xs-6">
                    <div class="product-images">
                      <div style="overflow-x:auto;max-height:700px;">
                        <canvas
                          id="jPolygon"
                          style="cursor:crosshair" 
                          data-imgsrc="./resources/img/userdefined/Image1.jpg"
                          onmousedown="point_it(event)"
                          oncontextmenu="return false;"
                        >
                        </canvas>
                      </div>
                    </div>
                  </div>
 
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>


<!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
                    <div class="ibox-title">
                        <h2>Instructions</h2>
                    </div>
                    <div class="ibox-content">
                            <div class="well well-lg">
                                <h3>
                                     To start using the tool.
                                </h3>
                                Use the Choose Image button to upload an Image.
                                
                            </div>
                            <div class="well well-lg">
                                <h3>
                                To start plotting. 
                                </h3>
                               Left Click on the screen, every click will plot a point.<br>
                                    Right click to close the polygon.
                            </div>
                            <div class="well well-sm">
                                <h3>
                                    Download JSON
                                </h3>
                                Information of all the plotted polygons will be downloaded as a JSON file.
                            </div>
                    </div>
               
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>

    <!-- Mainly scripts -->
    <script src="resources/js/jquery-2.1.1.js"></script>
    <script src="resources/js/bootstrap.min.js"></script>
    <script src="resources/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="resources/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="resources/js/inspinia.js"></script>
    <script src="resources/js/plugins/pace/pace.min.js"></script>
    <script src="./resources/js/userdefined/jPolygon.js"
	      type="text/javascript"
	></script>
    <script
      src="resources/js/userdefined/data.json"
      type="text/javascript"
    ></script>
    <!--  <script
      src="resources/js/userdefined/zoom.json"
      type="text/javascript"
    ></script>-->
     
  </body>
  
</html>