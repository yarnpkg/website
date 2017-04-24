To be able to run Yarn from anywhere, do the following:

1. Add this to your profile (this may be in your `.profile`, `.bashrc`, `.zshrc`, etc.): `export PATH="$PATH:/opt/yarn-[version]/bin"` (path may vary depending on where you installed/extracted Yarn)
1. In the terminal, log in and log out for the changes to take effect

To have access to Yarn's executables globally, you will need to set up the `PATH` environment variable in your terminal. To do this, add ``export PATH="$PATH:`yarn global bin`"`` to your profile (this may be in your `.profile`, `.bashrc`, `.zshrc`, etc.)
