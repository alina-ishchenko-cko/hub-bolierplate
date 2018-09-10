import { sheet } from 'emotion';
import serializer from 'jest-glamor-react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Enzyme React 16 Adapter
configure({ adapter: new Adapter() });

// Setup serializer for styled components
expect.addSnapshotSerializer(serializer(sheet));
