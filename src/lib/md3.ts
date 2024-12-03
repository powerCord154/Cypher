// Text Field
import "@material/web/textfield/filled-text-field";

// Button
import "@material/web/iconbutton/icon-button";
import "@material/web/button/filled-tonal-button";

// List
import "@material/web/list/list";
import "@material/web/list/list-item";

// Misc
import "@material/web/divider/divider";

// Style
import { styles as typescalestyles } from "@material/web/typography/md-typescale-styles";

if (typescalestyles.styleSheet) {
    document.adoptedStyleSheets.push(typescalestyles.styleSheet);
}
