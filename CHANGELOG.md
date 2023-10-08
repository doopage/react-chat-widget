# Changelog

## [3.3.0] - 2023-10-09

### Added
- **ResizableProps Interface**: Introduced the `ResizableProps` interface to dynamically adjust widget dimensions. Users can now utilize `heightOffset` and `widthOffset` to control the widget's maximum height and width, allowing for a better fit across various interfaces.
  
- **Emoji Picker Enhancement**: Transitioned from `emoji-mart` to `emoji-picker-react` for a better user experience and to address build type errors. Additionally, introduced the `.rcw-picker-icon` style for more personalized emoji picker stylings.

- **Subtitle Styling**: Added the `.rcw-subtitle` class for subtitles, providing users an easier way to apply custom styles.

- **X-Resizer Update**: Revamped the x-resizer to now support both vertical and diagonal resizing, enhancing user interaction and UI flexibility.

### Changed
- **ID Refactoring**: To reduce potential conflicts and enhance specificity, the `messages` ID has been renamed to `rcw-messages`.

### Removed
- **Emoji-Mart Dependency**: Due to build type errors and in favor of better support, the dependency on `emoji-mart` was replaced with `emoji-picker-react`.

### Note
- Ensure you test these changes in a staging environment before implementing them in production. Verify that any custom styles or scripts remain compatible, especially given the ID and class refinements.


## [3.2.2] - 2023-10-07

### Fixed
- **Build Errors**: Addressed and resolved build errors that emerged due to the recent updates in dependencies. This ensures smoother integrations and deployments.


## [3.2.1] - 2023-10-07

### Fixed
- **Build Errors**: Addressed and resolved build errors that emerged due to the recent updates in dependencies. This ensures smoother integrations and deployments.


## [3.2.0] - 2023-10-07

### Changed
- **Dependencies Update**: All dependencies have been updated to their latest versions, including a significant bump to React 18.
  
- **Classname Fix**: Resolved a classname conflict where `.loader` was clashing with other repositories, enhancing compatibility and reducing potential integration issues.

### Note
- This version is forked from [Wolox's react-chat-widget](https://github.com/Wolox/react-chat-widget), which was last maintained in 2021. With this fork, we aim to bring continued updates, improvements, and maintenance to the widget. For previous changelogs, please refer to the original author's repository.