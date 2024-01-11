File `Frame.tsx` has a link to the root:
```
<Link href="/" className="underline uppercase">
    Go to all frames
</Link>
```

## Issue

When a modal with `Frame.tsx` is open over the list, clicking on the link does not close the modal.