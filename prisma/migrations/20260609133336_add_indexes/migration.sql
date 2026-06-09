-- CreateIndex
CREATE INDEX `UmrahPackage_type_idx` ON `UmrahPackage`(`type`);

-- CreateIndex
CREATE INDEX `UmrahPackage_star_idx` ON `UmrahPackage`(`star`);

-- CreateIndex
CREATE INDEX `UmrahPackage_type_star_idx` ON `UmrahPackage`(`type`, `star`);
