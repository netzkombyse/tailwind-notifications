# TailwindCSS Notifications

> notification component with tailwindcss

## Install
```bash
npm install --save tailwind-notifications
```
## Usage

### Setup Environment Variables

Set the variables in .env

```
NEXT_PUBLIC_NOTIFICATION_STATUS = true
NEXT_PUBLIC_NOTIFICATION_OPEN = true
NEXT_PUBLIC_NOTIFICATION_START_DATE = '2023-12-01 00:00:01'
NEXT_PUBLIC_NOTIFICATION_END_DATE = '2023-12-31 23:59:59'
NEXT_PUBLIC_NOTIFICATION_TITLE = 'Lorem ipsum dolor sit amet'
NEXT_PUBLIC_NOTIFICATION_BODY = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
```

### Setup Context Provider

Place the notifications context wrapper in the root of the application.

```jsx
import React, { Component } from 'react'
import { NotificationsProvider } from "tailwind-notifications";

export default function App({Component}) {
  return (
    <NotificationsProvider>
      <Component />
    </NotificationsProvider>
  )
}

```