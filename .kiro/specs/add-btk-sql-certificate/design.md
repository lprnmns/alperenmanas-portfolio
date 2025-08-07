# Design Document

## Overview

This feature adds a new BTK SQL certificate to the existing portfolio certificate system. The implementation involves updating the certificate data array in the cvData.ts file to include the new certificate information.

## Architecture

The certificate system follows a simple data-driven approach:
- Certificate data is stored in `src/data/cvData.ts` as an exported array
- The data is consumed by both the homepage (`src/app/page.tsx`) and about page (`src/app/about/page.tsx`)
- Each certificate object contains title, issuer, and imageUrl properties

## Components and Interfaces

### Existing Certificate Interface
```typescript
interface Certificate {
  title: string;
  issuer: string;
  imageUrl: string;
}
```

### Data Structure
The new certificate will be added to the existing `certificates` array in `cvData.ts`:

```typescript
{
  title: "BTK-Uygulamalarla SQL Öğreniyorum",
  issuer: "BTK Akademi", 
  imageUrl: "/sertifikalar/btk-uygulamalarla-SQL.png"
}
```

## Data Models

### Certificate Data
- **title**: Display name of the certificate
- **issuer**: Organization that issued the certificate
- **imageUrl**: Path to the certificate image in the public directory

## Error Handling

No additional error handling is required as this follows the existing pattern. The React Image component will handle missing images gracefully.

## Testing Strategy

Since this is a simple data addition with no new functionality:
- Manual verification that the certificate appears on both pages
- Visual confirmation that the layout remains consistent
- Verification that the image loads correctly