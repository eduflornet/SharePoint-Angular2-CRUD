<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <!-- Angular -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.0/es6-shim.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.20/system-polyfills.js"></script>
    <script type="text/javascript" src="https://npmcdn.com/angular2@2.0.0-beta.9/es6/dev/src/testing/shims_for_IE.js"></script>

    <script type="text/javascript" src="https://code.angularjs.org/2.0.0-beta.9/angular2-polyfills.js"></script>
    <script type="text/javascript" src="https://code.angularjs.org/tools/system.js"></script>
    <script type="text/javascript" src="https://npmcdn.com/typescript@1.8.9/lib/typescript.js"></script>
    <script type="text/javascript" src="https://code.angularjs.org/2.0.0-beta.9/Rx.js"></script>
    <script type="text/javascript" src="https://code.angularjs.org/2.0.0-beta.9/angular2.dev.js"></script>

    <!-- Angular Http library -->
    <script type="text/javascript" src="https://code.angularjs.org/2.0.0-beta.9/http.dev.js"></script>

    <!-- Configuración y variables globales -->
    <script type="text/javascript" src="../Scripts/app/app.config.js"></script>

    <script type="text/javascript">
        System.config({
            transpiler: 'typescript',
            typescriptOptions: {
                emitDecoratorMetadata: true
            },
            map: {
                app: BASE_URL
            },
            packages: {
                app: {
                    main: 'main',
                    defaultExtension: 'ts'
                }
            }
        });
        ExecuteOrDelayUntilScriptLoaded(function () {
            System.import('app').catch(console.error.bind(console));
        }, "sp.js");
    </script>


    
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    App Angular2
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <%--Esta es la referencia al componente app, y con etiqueta <app></app> se renderiza--%>
    <app></app>

</asp:Content>
