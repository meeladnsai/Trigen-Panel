# :material-new-box:{ .md .middle } Trigen Wizard

To simplify the setup process and prevent user mistakes during installation, the [Trigen Wizard](https://github.com/meeladnsai/Trigen-Panel) project was launched which provides online and CLI installations. It supports both Workers and Pages methods and just takes a few seconds to install panel!

<p align="center" class="img-wrapper">
  <img src="/Trigen-Panel/images/wizard-web.jpg" width="400" alt="wizard-web" />
  <img src="/Trigen-Panel/images/wizard-cli.jpg" width="400" alt="wizard-cli" />
</p>

## 1. Cloudflare account

To use this method, all you need is a Cloudflare account. You can [sign up here](https://dash.cloudflare.com/sign-up/), and don’t forget to check your email afterward to verify your account.

## 2. Install Trigen Panel

### Web edition

This is a ready to use edition and provides a `Private Link` after first installation which enables `ONE-CLICK` installation on your account.

To easily install the latest stable version of Trigen Panel online:

```url title="Web installation"
https://github.com/meeladnsai/Trigen-Panel
```

### CLI edition

```bash title="Windows PowerShell"
irm https://raw.githubusercontent.com/meeladnsai/Trigen-Panel/main/install.ps1 | iex
```

```bash title="Android (Termux) - Linux - macOS"
bash <(curl -fsSL https://raw.githubusercontent.com/meeladnsai/Trigen-Panel/main/install.sh)
```

!!! warning "Termux usage attention"
    Be sure to download and install Termux only from its [official source](https://github.com/termux/termux-app/releases/latest). Installing via Google Play might cause issues. Also if you're connected to a VPN, disconnect it first.
