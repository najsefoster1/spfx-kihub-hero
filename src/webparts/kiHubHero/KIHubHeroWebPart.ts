import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';

import styles from './KIHubHero.module.scss';

export interface IKIHubHeroWebPartProps {
  title: string;
  rotatingWords: string;
  subtitle: string;
  button1Text: string;
  button1Link: string;
  button2Text: string;
  button2Link: string;
  button3Text: string;
  button3Link: string;
  button4Text: string;
  button4Link: string;
  showButtons: boolean;
}

export default class KIHubHeroWebPart extends BaseClientSideWebPart<IKIHubHeroWebPartProps> {
  private _rotationInterval: number | undefined;

  public render(): void {
    const words: string[] = (this.properties.rotatingWords || 'Learn|Build|Automate')
      .split('|')
      .map((word: string) => word.trim())
      .filter((word: string) => word.length > 0);

    const heroTitle: string =
      this.properties.title || 'Knowledge & Innovation Hub';

    const heroSubtitle: string =
      this.properties.subtitle ||
      'Your central place for AI, automation, reporting, and digital tools across THC.';

    this.domElement.innerHTML = `
      <section class="${styles.kiHubHero}">
        <div class="${styles.backgroundGlow}"></div>
        <div class="${styles.backgroundGlowTwo}"></div>

        <div class="${styles.heroContent}">
          <!-- LEFT SIDE -->
          <div class="${styles.leftContent}">
            <div class="${styles.kicker}">
              THC Knowledge &amp; Innovation Hub
            </div>

            <h1 class="${styles.heroTitle}">
              ${heroTitle}
            </h1>

            <div class="${styles.rotatingLine}">
              <span class="${styles.rotatingWord}" id="kihub-rotating-word">
                Learn.
              </span>
            </div>

            <p class="${styles.heroSubtitle}">
              ${heroSubtitle}
            </p>

            ${
              this.properties.showButtons
                ? `
                <div class="${styles.buttonRow}">
                  ${
                    this.properties.button1Text
                      ? `<a class="${styles.primaryButton}" href="${this.properties.button1Link || '#'}" target="_blank">${this.properties.button1Text}</a>`
                      : ''
                  }

                  ${
                    this.properties.button2Text
                      ? `<a class="${styles.secondaryButton}" href="${this.properties.button2Link || '#'}" target="_blank">${this.properties.button2Text}</a>`
                      : ''
                  }

                  ${
                    this.properties.button3Text
                      ? `<a class="${styles.secondaryButton}" href="${this.properties.button3Link || '#'}" target="_blank">${this.properties.button3Text}</a>`
                      : ''
                  }

                  ${
                    this.properties.button4Text
                      ? `<a class="${styles.secondaryButton}" href="${this.properties.button4Link || '#'}" target="_blank">${this.properties.button4Text}</a>`
                      : ''
                  }
                </div>
              `
                : ''
            }
          </div>

          <!-- RIGHT SIDE -->
          <div class="${styles.rightContent}">
            <div class="${styles.featureCard}">
              <div class="${styles.featureLabel}">
                Featured Focus
              </div>

              <div class="${styles.featureTitle}">
                Learn faster with AI-powered tools
              </div>

              <div class="${styles.featureBody}">
                Start with Copilot, explore prompt guidance, and discover tools that help you work smarter across THC.
              </div>

              <div class="${styles.badgeRow}">
                <span class="${styles.badge}">AI</span>
                <span class="${styles.badge}">Automation</span>
                <span class="${styles.badge}">Reporting</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    this._startWordRotation(words);
  }

  private _startWordRotation(words: string[]): void {
    if (this._rotationInterval) {
      window.clearInterval(this._rotationInterval);
    }

    const wordElement: HTMLElement | null =
      this.domElement.querySelector('#kihub-rotating-word');

    if (!wordElement || words.length === 0) {
      return;
    }

    let currentIndex: number = 0;
    wordElement.textContent = `${words[currentIndex]}.`;

    this._rotationInterval = window.setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length;

      wordElement.classList.remove(styles.fadeIn);
      wordElement.classList.add(styles.fadeOut);

      window.setTimeout(() => {
        wordElement.textContent = `${words[currentIndex]}.`;
        wordElement.classList.remove(styles.fadeOut);
        wordElement.classList.add(styles.fadeIn);
      }, 200);
    }, 2200);
  }

  protected onDispose(): void {
    if (this._rotationInterval) {
      window.clearInterval(this._rotationInterval);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                PropertyPaneTextField('title', {
                  label: 'Title'
                }),
                PropertyPaneTextField('rotatingWords', {
                  label: 'Rotating words (use | separator)'
                }),
                PropertyPaneTextField('subtitle', {
                  label: 'Subtitle',
                  multiline: true
                })
              ]
            },
            {
              groupName: 'Buttons',
              groupFields: [
                PropertyPaneCheckbox('showButtons', {
                  text: 'Show buttons'
                }),
                PropertyPaneTextField('button1Text', {
                  label: 'Button 1 Text'
                }),
                PropertyPaneTextField('button1Link', {
                  label: 'Button 1 Link'
                }),
                PropertyPaneTextField('button2Text', {
                  label: 'Button 2 Text'
                }),
                PropertyPaneTextField('button2Link', {
                  label: 'Button 2 Link'
                }),
                PropertyPaneTextField('button3Text', {
                  label: 'Button 3 Text'
                }),
                PropertyPaneTextField('button3Link', {
                  label: 'Button 3 Link'
                }),
                PropertyPaneTextField('button4Text', {
                  label: 'Button 4 Text'
                }),
                PropertyPaneTextField('button4Link', {
                  label: 'Button 4 Link'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}