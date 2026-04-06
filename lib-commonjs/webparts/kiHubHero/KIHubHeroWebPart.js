"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var KIHubHero_module_scss_1 = tslib_1.__importDefault(require("./KIHubHero.module.scss"));
var KIHubHeroWebPart = /** @class */ (function (_super) {
    tslib_1.__extends(KIHubHeroWebPart, _super);
    function KIHubHeroWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KIHubHeroWebPart.prototype.render = function () {
        var words = (this.properties.rotatingWords || 'Learn|Build|Automate')
            .split('|')
            .map(function (word) { return word.trim(); })
            .filter(function (word) { return word.length > 0; });
        var heroTitle = this.properties.title || 'Knowledge & Innovation Hub';
        var heroSubtitle = this.properties.subtitle ||
            'Your central place for AI, automation, reporting, and digital tools across THC.';
        this.domElement.innerHTML = "\n      <section class=\"".concat(KIHubHero_module_scss_1.default.kiHubHero, "\">\n        <div class=\"").concat(KIHubHero_module_scss_1.default.backgroundGlow, "\"></div>\n        <div class=\"").concat(KIHubHero_module_scss_1.default.backgroundGlowTwo, "\"></div>\n\n        <div class=\"").concat(KIHubHero_module_scss_1.default.heroContent, "\">\n          <!-- LEFT SIDE -->\n          <div class=\"").concat(KIHubHero_module_scss_1.default.leftContent, "\">\n            <div class=\"").concat(KIHubHero_module_scss_1.default.kicker, "\">\n              THC Knowledge &amp; Innovation Hub\n            </div>\n\n            <h1 class=\"").concat(KIHubHero_module_scss_1.default.heroTitle, "\">\n              ").concat(heroTitle, "\n            </h1>\n\n            <div class=\"").concat(KIHubHero_module_scss_1.default.rotatingLine, "\">\n              <span class=\"").concat(KIHubHero_module_scss_1.default.rotatingWord, "\" id=\"kihub-rotating-word\">\n                Learn.\n              </span>\n            </div>\n\n            <p class=\"").concat(KIHubHero_module_scss_1.default.heroSubtitle, "\">\n              ").concat(heroSubtitle, "\n            </p>\n\n            ").concat(this.properties.showButtons
            ? "\n                <div class=\"".concat(KIHubHero_module_scss_1.default.buttonRow, "\">\n                  ").concat(this.properties.button1Text
                ? "<a class=\"".concat(KIHubHero_module_scss_1.default.primaryButton, "\" href=\"").concat(this.properties.button1Link || '#', "\" target=\"_blank\">").concat(this.properties.button1Text, "</a>")
                : '', "\n\n                  ").concat(this.properties.button2Text
                ? "<a class=\"".concat(KIHubHero_module_scss_1.default.secondaryButton, "\" href=\"").concat(this.properties.button2Link || '#', "\" target=\"_blank\">").concat(this.properties.button2Text, "</a>")
                : '', "\n\n                  ").concat(this.properties.button3Text
                ? "<a class=\"".concat(KIHubHero_module_scss_1.default.secondaryButton, "\" href=\"").concat(this.properties.button3Link || '#', "\" target=\"_blank\">").concat(this.properties.button3Text, "</a>")
                : '', "\n\n                  ").concat(this.properties.button4Text
                ? "<a class=\"".concat(KIHubHero_module_scss_1.default.secondaryButton, "\" href=\"").concat(this.properties.button4Link || '#', "\" target=\"_blank\">").concat(this.properties.button4Text, "</a>")
                : '', "\n                </div>\n              ")
            : '', "\n          </div>\n\n          <!-- RIGHT SIDE -->\n          <div class=\"").concat(KIHubHero_module_scss_1.default.rightContent, "\">\n            <div class=\"").concat(KIHubHero_module_scss_1.default.featureCard, "\">\n              <div class=\"").concat(KIHubHero_module_scss_1.default.featureLabel, "\">\n                Featured Focus\n              </div>\n\n              <div class=\"").concat(KIHubHero_module_scss_1.default.featureTitle, "\">\n                Learn faster with AI-powered tools\n              </div>\n\n              <div class=\"").concat(KIHubHero_module_scss_1.default.featureBody, "\">\n                Start with Copilot, explore prompt guidance, and discover tools that help you work smarter across THC.\n              </div>\n\n              <div class=\"").concat(KIHubHero_module_scss_1.default.badgeRow, "\">\n                <span class=\"").concat(KIHubHero_module_scss_1.default.badge, "\">AI</span>\n                <span class=\"").concat(KIHubHero_module_scss_1.default.badge, "\">Automation</span>\n                <span class=\"").concat(KIHubHero_module_scss_1.default.badge, "\">Reporting</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n    ");
        this._startWordRotation(words);
    };
    KIHubHeroWebPart.prototype._startWordRotation = function (words) {
        if (this._rotationInterval) {
            window.clearInterval(this._rotationInterval);
        }
        var wordElement = this.domElement.querySelector('#kihub-rotating-word');
        if (!wordElement || words.length === 0) {
            return;
        }
        var currentIndex = 0;
        wordElement.textContent = "".concat(words[currentIndex], ".");
        this._rotationInterval = window.setInterval(function () {
            currentIndex = (currentIndex + 1) % words.length;
            wordElement.classList.remove(KIHubHero_module_scss_1.default.fadeIn);
            wordElement.classList.add(KIHubHero_module_scss_1.default.fadeOut);
            window.setTimeout(function () {
                wordElement.textContent = "".concat(words[currentIndex], ".");
                wordElement.classList.remove(KIHubHero_module_scss_1.default.fadeOut);
                wordElement.classList.add(KIHubHero_module_scss_1.default.fadeIn);
            }, 200);
        }, 2200);
    };
    KIHubHeroWebPart.prototype.onDispose = function () {
        if (this._rotationInterval) {
            window.clearInterval(this._rotationInterval);
        }
    };
    Object.defineProperty(KIHubHeroWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    KIHubHeroWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: 'KIHub Hero Settings'
                    },
                    groups: [
                        {
                            groupName: 'Text',
                            groupFields: [
                                (0, sp_webpart_base_1.PropertyPaneTextField)('title', {
                                    label: 'Title'
                                }),
                                (0, sp_webpart_base_1.PropertyPaneTextField)('rotatingWords', {
                                    label: 'Rotating words (use | separator)'
                                }),
                                (0, sp_webpart_base_1.PropertyPaneTextField)('subtitle', {
                                    label: 'Subtitle',
                                    multiline: true
                                })
                            ]
                        },
                        {
                            groupName: 'Buttons',
                            groupFields: [
                                (0, sp_webpart_base_1.PropertyPaneCheckbox)('showButtons', {
                                    text: 'Show buttons'
                                }),
                                (0, sp_webpart_base_1.PropertyPaneTextField)('button1Text', {
                                    label: 'Button 1 Text'
                                }),
                                (0, sp_webpart_base_1.PropertyPaneTextField)('button1Link', {
                                    label: 'Button 1 Link'
                                }),
                                (0, sp_webpart_base_1.PropertyPaneTextField)('button2Text', {
                                    label: 'Button 2 Text'
                                }),
                                (0, sp_webpart_base_1.PropertyPaneTextField)('button2Link', {
                                    label: 'Button 2 Link'
                                }),
                                (0, sp_webpart_base_1.PropertyPaneTextField)('button3Text', {
                                    label: 'Button 3 Text'
                                }),
                                (0, sp_webpart_base_1.PropertyPaneTextField)('button3Link', {
                                    label: 'Button 3 Link'
                                }),
                                (0, sp_webpart_base_1.PropertyPaneTextField)('button4Text', {
                                    label: 'Button 4 Text'
                                }),
                                (0, sp_webpart_base_1.PropertyPaneTextField)('button4Link', {
                                    label: 'Button 4 Link'
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return KIHubHeroWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = KIHubHeroWebPart;
//# sourceMappingURL=KIHubHeroWebPart.js.map