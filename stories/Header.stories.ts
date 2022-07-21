import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import type { Story, Meta } from '@storybook/angular';

import Header from './header.component';
import ButtonStoryComponent from '../src/features/cartographie/infrastructure/presentation/components/button-story/button-story.component';

export default {
  title: 'Example/Header',
  component: Header,
  decorators: [
    moduleMetadata({
      declarations: [ButtonStoryComponent],
      imports: [CommonModule]
    })
  ],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen'
  }
} as Meta;

const Template: Story<Header> = (args: Header) => ({
  props: args
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: 'Jane Doe'
  }
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
