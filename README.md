# **UTARi Accommodation**

A web application that was developed when I got frustrated with the official accommodation listing website provided by UTAR

However, I never get the change to actually use it because of MCO and soon it became my Final Year Project (FYP)

I must admit I could have proposed a more advanced title 😏

## Usage

1. Filter accommodations with price range, search bar, number of bath/bed rooms (unit-based) and room capacity(room-based)
2. Rate and unrate any accommodation
3. Bookmark and unbookmark any accommodation
4. Download bookmarked accommodation into a text file
5. Contact the handler of an accommodation through WhatsApp and/or email if there's any

## Preview

<details>
<summary>Click to preview!</summary>

#### Main Page

![Home](./docs/home.png 'Home')

#### About Page

![About](./docs/about.png 'About')

#### Contact Page

![Contact](./docs/contact.png 'Contact')

#### Accommodation Page (Room-Based)

![Room](./docs/general-room.png 'Room')
![Detailed Room](./docs/detailed-room.png 'Detailed Room')

#### Accommodation Page (Unit-Based)

![Unit](./docs/general-unit.png 'Unit')
![Detailed Unit](./docs/detailed-unit.png 'Detailed Unit')

#### How it Works Page

![Work](./docs/how-it-works.png 'Work')

#### Last but not least, footer

![Footer](./docs/footer.png 'Footer')

</details>

## Tech Used

| Aspect                                                                 | Name              |
| ---------------------------------------------------------------------- | ----------------- |
| Development Language                                                   | TypeScipt         |
| Scripting Language                                                     | JavaScript        |
| Bundling                                                               | Esbuild           |
| Testing                                                                | Jest              |
| Styling                                                                | Styled-components |
| Library                                                                | React             |
| Authentication Service                                                 | Firebase          |
| Build Automation Tool                                                  | Make              |
| Progressive Web App                                                    | Workbox           |
| Text Editor                                                            | NeoVim            |
| Dependency Management                                                  | Yarn              |
| Continuous Integration, Continuous Delivery, and Continuous Deployment | GitHub Actions    |

## How to build this app?

_*Make sure you have `yarn` and `make` available in your system*_

### Environment Variables

#### Development and Testing

Refer to `.env.example` which is an example file for you to know what key-value pairs are needed to develop this project

Then, create an `.env` file that will be used for development and testing. Then copy the key-value pairs to it and then add the values

#### Make Commands

_*Below are the listed commands that you can use to build/develop/test this app*_

| Command           | Usage                                             |
| ----------------- | ------------------------------------------------- |
| make start        | Start development                                 |
| make test         | Run all test code                                 |
| make build        | Bundle and build the app                          |
| make typecheck    | Run typechecking for source code                  |
| make lint         | Run linter for source and test code               |
| make format-check | Run prettier to check source and test code format |
| make format       | Run prettier to format source and test code       |
| make install      | Install all dependencies                          |
