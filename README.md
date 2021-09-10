# Facilitator BOT
BOT to designate facilitator in meetings.

## How to install

- Upload the code to Github
- Link the repository to heroku
- Login to slack in your domain
- Create an app at https://api.slack.com/apps/
- In the `Basic Information` section, `Add features and functionality`, select the `Bots` menu
- Create and configure the BOT user
- In the `Basic Information` section, `Add features and functionality`, select the `Permissions` menu
- In the `Scope` section, add the `chat:write` and `commands` permissions
- Copy the `Bot User OAuth Token`
- In Heroku, create a variable named `SLACK_BOT_TOKEN` and set the value to be the copied token

That's all!

## How to use

In a channel where you have invited your BOT, you can enter the command:
```
/facilitator John Jane Jim Joe
```
The BOT will randomly chose one in the list and display in the chat.