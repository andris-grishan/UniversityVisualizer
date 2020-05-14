<?php
global $_pageBody, $_controller,
       $_viewData, $_siteUrl,
       $_companyName, $_action;
?>

<!DOCTYPE html>
<html lang="lv">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>DU - Building Navigation</title>

        <!-- mobile responsive meta -->

        <link rel="stylesheet" href="<?php echo $_siteUrl; ?>/theme/plugins/bootstrap/bootstrap.min.css">
        <link rel="stylesheet" href="<?php echo $_siteUrl; ?>/theme/plugins/themify-icons/themify-icons.css">

        <link rel="stylesheet" href="<?php echo $_siteUrl; ?>/theme/plugins/trumbowyg/ui/trumbowyg.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="<?php echo $_siteUrl; ?>/theme/plugins/trumbowyg/plugins/colors/ui/trumbowyg.colors.min.css" rel="stylesheet" />

        <link rel="stylesheet" href="<?php echo $_siteUrl; ?>/theme/plugins/dropzone/basic.min.css" rel="stylesheet">
        <link rel="stylesheet" href="<?php echo $_siteUrl; ?>/theme/plugins/dropzone/dropzone.min.css" rel="stylesheet">

        <link rel="stylesheet" href="<?php echo $_siteUrl; ?>/theme/css/style.css" rel="stylesheet">
        
        <!--Favicon-->

        <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $_siteUrl; ?>/theme/images/favs/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $_siteUrl; ?>/theme/images/favs/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $_siteUrl; ?>/theme/images/favs/favicon-16x16.png">
        <link rel="manifest" href="<?php echo $_siteUrl; ?>/theme/images/favs/site.webmanifest">
        <link rel="mask-icon" href="<?php echo $_siteUrl; ?>/theme/images/favs/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">

    </head>

    <body>
        <!-- preloader start -->
        <div class="preloader">
            <img src="<?php echo $_siteUrl; ?>/theme/images/preloader.gif" alt="preloader">
        </div>
        <!-- preloader end --> 

        <!-- navigation -->
        <header>
            <!-- nav bar -->
            <div class="navigation">
                <div class="container">
                    <nav class="navbar navbar-expand-lg">
                        <a href="/admin" class="header-logo">
                            <div class="navbar-brand">
                                <div class="navbar-icon">
                                    <svg fill="#007bff" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path></svg>
                                </div>
                                <div class="navbar-name">
                                    <span class="navbar-title">
                                        <?php echo $_companyName; ?>
                                    </span>
                                    <span class="navbar-subtitle">
                                        Building navigation
                                    </span>
                                </div>
                            </div>
                        </a>
                    </nav>
                </div>
            </div>
        </header>

        <!-- /navigation --> 
        <div class="page-body">
            <div class="page-body-content container">
                <div class="row">
                    <div class="col-md-12">
                        <?php include_once($_pageBody); ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- footer -->
        <footer>
            <div class="copyrights">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            Copyrights © <?php echo (new DateTime())->format("Y"); ?> <span class="brand-name"><?php echo $_companyName; ?></span>.
                        </div>
                        <div class="col-md-12">
                            All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!-- /footer --> 

        <script src="<?php echo $_siteUrl; ?>/theme/plugins/jQuery/jquery.min.js"></script>
        <script src="<?php echo $_siteUrl; ?>/theme/plugins/bootstrap/bootstrap.min.js"></script>

        <script src="<?php echo $_siteUrl; ?>/theme/plugins/trumbowyg/trumbowyg.min.js" type="text/javascript"></script>
        <script src="<?php echo $_siteUrl; ?>/theme/plugins/trumbowyg/plugins/colors/trumbowyg.colors.min.js"></script>
        <script src="<?php echo $_siteUrl; ?>/theme/plugins/trumbowyg/plugins/fontfamily/trumbowyg.fontfamily.min.js"></script>
        <script src="<?php echo $_siteUrl; ?>/theme/plugins/trumbowyg/plugins/fontsize/trumbowyg.fontsize.min.js"></script>
        <script src="<?php echo $_siteUrl; ?>/theme/plugins/trumbowyg/plugins/history/trumbowyg.history.min.js"></script>

        <script src="<?php echo $_siteUrl; ?>/theme/plugins/dropzone/dropzone.min.js"></script>
        <!-- <script src="<?php //echo $_siteUrl; ?>/theme/plugins/dropzone/dropzone-amd-module.min.js"></script> -->

        <script src="<?php echo $_siteUrl; ?>/theme/js/script.js"></script>
        <script src="<?php echo $_siteUrl; ?>/theme/js/main.js" async></script>
    </body>
</html>