import * as React from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

//this is for text, not entirely sure if needed
const MyComponent = () => (
  <>
    <Text variant="displayLarge">Display Large</Text>
    <Text variant="displayMedium">Display Medium</Text>
    <Text variant="displaySmall">Display small</Text>

    <Text variant="headlineLarge">Headline Large</Text>
    <Text variant="headlineMedium">Headline Medium</Text>
    <Text variant="headlineSmall">Headline Small</Text>

    <Text variant="titleLarge">Title Large</Text>
    <Text variant="titleMedium">Title Medium</Text>
    <Text variant="titleSmall">Title Small</Text>

    <Text variant="bodyLarge">Body Large</Text>
    <Text variant="bodyMedium">Body Medium</Text>
    <Text variant="bodySmall">Body Small</Text>

    <Text variant="labelLarge">Label Large</Text>
    <Text variant="labelMedium">Label Medium</Text>
    <Text variant="labelSmall">Label Small</Text>
 </>
);


const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [text, setText] = React.useState("");

  return (
    <View>
      <Text variant="displayMedium">Thirft with Drift</Text>
      <Text variant="titleLarge">Login:</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
      />
    </View>
  );
};

export default LoginScreen;
