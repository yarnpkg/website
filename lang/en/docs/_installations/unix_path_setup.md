If Yarn is not found in your PATH, follow these steps to add it and allow it to be run from anywhere.

Note: your profile may be in your `.profile`, `.bash_profile`, `.bashrc`, `.zshrc`, etc.

1.  Add this to your profile: `export PATH="$PATH:/opt/yarn-[version]/bin"` (the path may vary depending on where you extracted Yarn to)
1.  In the terminal, log in and log out for the changes to take effect

To have access to Yarn's executables globally, you will need to set up the `PATH` environment variable in your terminal. To do this, add `` export PATH="$PATH:`yarn global bin`" `` to your profile, or `` set PATH $PATH (yarn global bin) `` in the `~/.config/fish/config.fish` file if you use Fish shell.
