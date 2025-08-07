# Requirements Document

## Introduction

Add a new BTK SQL certificate to the existing portfolio website's certificate section. The certificate image is already available in the public/sertifikalar directory and needs to be integrated into the existing certificate display system.

## Requirements

### Requirement 1

**User Story:** As a portfolio visitor, I want to see the new BTK SQL certificate displayed alongside existing certificates, so that I can view all of the developer's certifications.

#### Acceptance Criteria

1. WHEN a user visits the portfolio homepage THEN the system SHALL display the BTK SQL certificate in the certificates section
2. WHEN a user visits the about page THEN the system SHALL display the BTK SQL certificate in the certificates section
3. WHEN the certificate is displayed THEN the system SHALL show the certificate title "BTK-Uygulamalarla SQL Öğreniyorum"
4. WHEN the certificate is displayed THEN the system SHALL show the issuer as "BTK Akademi"
5. WHEN the certificate is displayed THEN the system SHALL use the image located at "/sertifikalar/btk-uygulamalarla-SQL.png"

### Requirement 2

**User Story:** As a developer maintaining the portfolio, I want the new certificate to follow the same data structure as existing certificates, so that the code remains consistent and maintainable.

#### Acceptance Criteria

1. WHEN adding the certificate data THEN the system SHALL use the same object structure as existing certificates
2. WHEN the certificate is added THEN the system SHALL maintain the existing grid layout and styling
3. WHEN the certificate is displayed THEN the system SHALL use the same responsive design as other certificates