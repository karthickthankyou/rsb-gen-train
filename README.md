# rsb-gen

Automate react component creation with a corresponding storybook component with a simple command. The below command creates the component in the project root.

```
npx rsb-gen ComponentName
```

### Component location

Specify the component path from the project root.

```
npx rsb-gen src/components/atoms/MainCard
```

### Test file (Optional)

Valid options are -c, --cypress, -j, --jest.

```
npx rsb-gen src/components/atoms/MainCard --cypress
```

### Files

```
_.tsx
_.stories.tsx
_.test.tsx
_.index.ts
```

### Typescript

Right now, this package only generates typescript files.

### Sample output

![Output log](https://raw.githubusercontent.com/karthickthankyou/rsb-gen/main/assets/output.png)
